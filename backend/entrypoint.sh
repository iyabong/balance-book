#!/bin/bash

echo "📦 OCI Wallet 복원 중..."
echo "$WALLET_B64" | base64 -d > /app/wallet.zip
unzip -o /app/wallet.zip -d /app/wallet

echo "🚀 .NET 앱 실행"
dotnet BalanceBook.dll
