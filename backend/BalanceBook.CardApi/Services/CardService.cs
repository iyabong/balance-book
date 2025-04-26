using BalanceBook.CardApi.Models;
using Supabase;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BalanceBook.CardApi.Services;

public class CardService : ICardService
{

    public async Task<IEnumerable<CardResponseDto>> GetAllAsync()
    {
        var client = await SupabaseClientFactory.GetClientAsync();

        // cards 테이블에서 모든 카드 가져오기
        var cardResponse = await client.From<CardDto>().Get();
        var cards = cardResponse.Models;

        // transactions 테이블에서 모든 거래 내역 가져오기
        var transactionResponse = await client.From<TransactionDto>().Get();
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
}