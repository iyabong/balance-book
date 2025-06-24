#!/bin/bash

echo "📦 OCI Wallet 복원 중..."
echo "$WALLET_B64" | base64 -d > /app/wallet.zip
unzip -o /app/wallet.zip -d /app/wallet

# 👉 현재 컨테이너 외부 IP 출력
echo "🌍 현재 외부 IP:"
curl ifconfig.me || wget -qO- ifconfig.me

echo "🚀 .NET 앱 실행"
dotnet BalanceBook.dll
