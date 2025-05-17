# Dockerfile for railway

# Build stage
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# 프로젝트 root 기준에서 복사
COPY backend/ ./

# 프로젝트 폴더로 이동
WORKDIR /src/BalanceBook.CardApi

# publish
RUN dotnet publish -c Release -o /out

# Runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /out .

# ENTRYPOINT 수정: 절대경로도 OK
ENTRYPOINT ["dotnet", "BalanceBook.CardApi.dll"]