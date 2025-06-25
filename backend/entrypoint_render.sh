#!/bin/bash
set -x

echo "📦 [Render] OCI Wallet 복원 중..." >&2
unzip /etc/secrets/Wallet_A.zip -d /app/wallet

echo "📁 wallet 폴더 목록:" >&2
ls -l /app/wallet

echo "🌍 현재 외부 IP:" >&2
curl ifconfig.me || wget -qO- ifconfig.me

echo "🚀 .NET 앱 실행" >&2
dotnet BalanceBook.dll