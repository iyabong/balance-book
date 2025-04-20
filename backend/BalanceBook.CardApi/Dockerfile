# Build stage
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

COPY . ./
WORKDIR /src/BalanceBook.CardApi
RUN dotnet publish BalanceBook.CardApi.csproj -c Release -o /out && ls -al /out

# Runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:9.0
WORKDIR /app
COPY --from=build /out .

ENV ASPNETCORE_URLS=http://+:$PORT
EXPOSE 80

ENTRYPOINT ["dotnet", "BalanceBook.CardApi.dll"]