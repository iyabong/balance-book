import obd
import time
import json
import requests
import random
from datetime import datetime

# ==========================================
# 1. 설정 (Configuration)
# ==========================================

# [upstash]
UPSTASH_URL = "UPSTASH_URL" # Redis > Details
UPSTASH_TOKEN = "UPSTASH_TOKEN" # Redis > Details
# [Telegram]
TELEGRAM_TOKEN = "TELEGRAM_TOKEN" # @BotFather > /newbot
CHAT_ID = "CHAT_ID" # https://core.telegram.org/api


# 데이터 전송 주기
BATCH_SIZE = 50  # 50개 모아서 전송
IS_SIMULATION = False # 초기값

# ==========================================
# 2. 통신 함수들
# ==========================================
def send_telegram(msg):
    """텔레그램 메시지 전송"""
    url = f"https://api.telegram.org/bot{TELEGRAM_TOKEN}/sendMessage"
    payload = {"chat_id": CHAT_ID, "text": msg}
    try:
        requests.post(url, json=payload)
    except Exception as e:
        print(f"❌ 텔레그램 실패: {e}")

def send_to_upstash(data_list):
    """Upstash로 데이터 전송 (핵심!)"""
    try:
        # 리스트를 JSON 문자열로 변환
        payload = json.dumps(data_list)
        
        headers = {
            "Authorization": f"Bearer {UPSTASH_TOKEN}",
            "Content-Type": "application/json"
        }
        
        # 실제 전송
        response = requests.post(UPSTASH_URL, headers=headers, data=payload)
        
        if response.status_code == 200:
            return True
        else:
            print(f"🔥 Upstash 에러({response.status_code}): {response.text}")
            return False
    except Exception as e:
        print(f"🔥 전송 실패: {e}")
        return False

# ==========================================
# 3. 메인 코드
# ==========================================
print("🚗 프로그램 시작...")

# OBD 연결 시도
try:
    connection = obd.OBD()
    if connection.is_connected():
        print("✅ 차량 연결 성공! (Real Mode)")
        IS_SIMULATION = False
    else:
        raise Exception("Not connected")
except:
    print("⚠️ 차량 연결 실패 -> 시뮬레이션 모드 (가짜 데이터)")
    IS_SIMULATION = True
    connection = None

send_telegram(f"🟢 주행 시작!\n모드: {'실전' if not IS_SIMULATION else '시뮬레이션'}")

SESSION_ID = datetime.now().strftime("%Y%m%d_%H%M%S")
buffer = []
start_time = time.time()
total_dist = 0

print(f"🚀 수집 시작 (Session: {SESSION_ID})")
print("   (점 '.' 하나당 데이터 50개 전송됨)")

try:
    while True:
        # --- [1] 데이터 수집 ---
        now = time.time()
        
        # 가짜 GPS (나중에 실제 GPS 코드로 교체)
        gps = {
            "lat": 37.5665 + (random.random() * 0.001),
            "lon": 126.9780 + (random.random() * 0.001)
        }

        # OBD 데이터 읽기
        if not IS_SIMULATION and connection:
            cmd_speed = connection.query(obd.commands.SPEED)
            cmd_rpm = connection.query(obd.commands.RPM)
            
            speed = cmd_speed.value.magnitude if not cmd_speed.is_null() else 0
            rpm = cmd_rpm.value.magnitude if not cmd_rpm.is_null() else 0
        else:
            # 시뮬레이션
            speed = random.randint(0, 100)
            rpm = random.randint(1000, 3000)

        # 데이터 패키징
        packet = {
            "car_id": "kia_forte",
            "ts": now,
            "sid": SESSION_ID,
            "data": {
                "spd": speed,
                "rpm": rpm,
                "gps": gps
            }
        }
        
        buffer.append(packet)
        
        # 거리 누적 (단순 계산)
        if speed > 0:
            total_dist += (speed * (0.1 / 3600))

        # --- [2] 버퍼 전송 (50개 찰 때마다) ---
        if len(buffer) >= BATCH_SIZE:
            success = send_to_upstash(buffer)
            if success:
                print(".", end="", flush=True)
            buffer = [] # 버퍼 비우기

        time.sleep(0.1) # 0.1초 대기

except KeyboardInterrupt:
    print("\n\n🛑 주행 종료 (Ctrl+C 감지)")
    
    # --- [3] 잔반 처리 (Flush) ---
    if len(buffer) > 0:
        print(f"📦 남은 데이터 {len(buffer)}개 전송 중...", end="")
        send_to_upstash(buffer)
        print(" 완료!")

    # 리포트 생성
    duration = int(time.time() - start_time)
    minute = duration // 60
    second = duration % 60
    
    report = (
        f"🏁 [주행 종료 리포트]\n"
        f"⏱️ 시간: {minute}분 {second}초\n"
        f"📏 거리: {total_dist:.2f} km\n"
        f"💾 저장된 세션: {SESSION_ID}"
    )
    send_telegram(report)
    print("👋 프로그램 완전 종료")

except Exception as e:
    print(f"\n❌ 에러 발생: {e}")
    send_telegram(f"🚨 에러로 종료: {e}")