import json
import random
from datetime import datetime

def generate_event():
    events = [
        {
            "event": "Multiple failed logins",
            "source_ip": "192.0.2.10",
            "failed_attempts": 8
        },
        {
            "event": "Unusual login time",
            "source_ip": "192.0.2.20",
            "failed_attempts": 1
        },
        {
            "event": "Normal user login",
            "source_ip": "192.0.2.30",
            "failed_attempts": 0
        }
    ]

    event = random.choice(events)

    if event["failed_attempts"] >= 5:
        risk = "HIGH"
        status = "Suspicious"
    elif event["failed_attempts"] >= 1:
        risk = "MEDIUM"
        status = "Review"
    else:
        risk = "LOW"
        status = "Normal"

    event["risk"] = risk
    event["status"] = status
    event["timestamp"] = datetime.now().isoformat(
        timespec="seconds"
    )

    return event


if __name__ == "__main__":
    result = generate_event()
    print(json.dumps(result, indent=4))