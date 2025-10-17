import requests
from config import config


def send_telegram_message(message: str) -> bool:
    """
    Sends a message to a Telegram chat using the Telegram Bot API.

    Args:
        message (str): The message to be sent.

    Returns:
        bool: True if the message was sent successfully, False otherwise.
    """
    # Assign defaults from config if not passed explicitly
    bot_token = config.telegram_bot_token
    chat_id = config.telegram_chat_id

    url = f"https://api.telegram.org/bot{bot_token}/sendMessage"
    payload = {
        "chat_id": chat_id,
        "text": message,
        "parse_mode": "Markdown",
    }

    try:
        response = requests.post(url, json=payload)
        response.raise_for_status()
        return True
    except requests.RequestException as e:
        print(f"Error sending message: {e}")
        return False
