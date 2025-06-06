using BalanceBook.Models;
using BalanceBook.Dtos;

namespace BalanceBook.Services;

public class CardService : ICardService
{

    public async Task<IEnumerable<CardResponseDto>> GetAllAsync()
    {
        var client = await SupabaseClientFactory.GetClientAsync();

        // cards 테이블에서 모든 카드 가져오기
        var cardResponse = await client.From<Card>().Get();
        var cards = cardResponse.Models;

        // transactions 테이블에서 모든 거래 내역 가져오기
        var transactionResponse = await client.From<Transaction>().Get();
        var transactions = transactionResponse.Models;

        // 각 카드의 잔액 계산
        var result = cards.Select(card =>
        {
            var balance = transactions
                            .Where(t => t.CardId == card.Id)
                            .Sum(t => t.Type == "payment" ? -t.Amount : t.Amount);

            return new CardResponseDto
            {
                Id = card.Id,
                CardNo = card.CardNo,
                Name = card.Name,
                CreatedAt = card.CreatedAt,
                Balance = balance
            };
        });

        return result;
    }

     public async Task<IEnumerable<CardHistoryResponseDto>> GetCardHistoriesAsync(Guid cardId)
    {
        var client = await SupabaseClientFactory.GetClientAsync();

        var result = await client.From<Transaction>()
                                 .Where(t => t.CardId == cardId)
                                 .Order(t => t.CreatedAt, Supabase.Postgrest.Constants.Ordering.Descending)
                                 .Get();

        return result.Models.Select(t => new CardHistoryResponseDto
        {
            Type = t.Type,
            Amount = t.Amount,
            CreatedAt = t.CreatedAt
        });
    }

    public async Task<CardResponseDto> ProcessTransactionAsync(CardTransactionDto request)
    {
        var client = await SupabaseClientFactory.GetClientAsync();

        // 1. 충전/결제 INSERT
        var transaction = new Transaction
        {
            Id = Guid.NewGuid(),
            CardId = request.CardId,
            Type = request.Type,
            Amount = request.Amount,
            CreatedAt = DateTime.UtcNow,
        };

        var insertResponse = await client.From<Transaction>().Insert(transaction);
        if (!insertResponse.ResponseMessage.IsSuccessStatusCode)
        {
            throw new Exception("충전/결제 실패");
        }

        // 2. 해당 카드 조회
        var cardResponse = await client.From<Card>()
                                       .Where(c => c.Id == request.CardId)
                                       .Get();
        var card = cardResponse.Models.FirstOrDefault();
        if (card == null) throw new Exception("카드 없음");

        // 3. 해당 카드의 이력 재조회해서 잔액 계산
        var transactionResponse = await client.From<Transaction>()
                                              .Where(t => t.CardId == request.CardId)
                                              .Get();

        var transactions = transactionResponse.Models;

        var balance = transactions.Sum(t => t.Type == "payment" ? -t.Amount : t.Amount);

        // 4. 해당 카드 응답 생성
        return new CardResponseDto
        {
            Id = card.Id,
            CardNo = card.CardNo,
            Name = card.Name,
            CreatedAt = card.CreatedAt,
            Balance = balance
        };
    }
}