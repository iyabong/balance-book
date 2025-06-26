#!/bin/bash

echo "📦 [Render] OCI Wallet 복원 중..."
base64 -d /etc/secrets/Wallet_A_b64.txt > /app/wallet.zip
unzip /app/wallet.zip -d /app/wallet

echo "📁 wallet 폴더 목록:"
ls -l /app/wallet

echo "🌍 현재 외부 IP:"
curl ifconfig.me || wget -qO- ifconfig.me

echo "🚀 .NET 앱 실행"
dotnet BalanceBook.dll