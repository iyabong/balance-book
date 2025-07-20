#!/bin/bash

echo "📦 [Azure] OCI Wallet 복원 중..."
if [ -n "$WALLET_B64" ]; then
    echo "$WALLET_B64" | base64 -d > /app/wallet.zip
    unzip -o /app/wallet.zip -d /app/wallet
    echo "📁 복원된 wallet 폴더 목록:"
    ls -l /app/wallet
else
  echo "⚠️ WALLET_B64 환경변수가 설정되어 있지 않습니다."
fi

echo "🌍 현재 외부 IP:"
curl -s ifconfig.me || wget -qO- ifconfig.me

echo "🌐 ASP.NET Core 포트 80으로 설정"
export ASPNETCORE_URLS=http://+:80

echo "🚀 .NET 앱 실행 시작..."
exec dotnet BalanceBook.dll