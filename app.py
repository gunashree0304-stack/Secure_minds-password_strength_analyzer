from flask import Flask, render_template, request
import re
import random

app = Flask(__name__)

# ----------------------------
# Password Roast Messages
# ----------------------------

WEAK_ROASTS = [
    "😂 Hackers just sent you a thank-you card.",
    "😂 Even your pet could guess this password.",
    "😂 This password belongs in 2005.",
    "😂 '123456' called... it wants its cousin back.",
    "😂 My calculator guessed it on the first try."
]

MEDIUM_ROASTS = [
    "😅 You're getting there. Hackers need coffee now.",
    "😅 Not bad... but don't use it for your bank account.",
    "😅 Better than average, but still room to improve.",
    "😅 Almost there. Add one more security layer!"
]

STRONG_ROASTS = [
    "😎 Hackers rage-quit after seeing this password.",
    "😎 Fort Knox approves this password.",
    "😎 Even your future self may forget this password.",
    "😎 This password deserves its own bodyguard."
]

# ----------------------------
# Cybersecurity Facts
# ----------------------------

FACTS = [
    "81% of hacking-related breaches involve weak or stolen passwords.",
    "Using Multi-Factor Authentication greatly improves account security.",
    "Never reuse the same password across different websites.",
    "Password managers help generate and store secure passwords.",
    "Long passwords are much harder to crack than short complex passwords."
]


@app.route("/", methods=["GET", "POST"])
def home():

    password = ""
    score = None
    strength = ""
    color = ""
    roast = ""
    fact = ""
    crack_time = ""
    risk = ""

    checks = {
        "length": False,
        "uppercase": False,
        "lowercase": False,
        "number": False,
        "special": False
    }

    suggestions = []

    if request.method == "POST":

        password = request.form["password"]

        # Length
        if len(password) >= 8:
            score = 1
            checks["length"] = True
        else:
            score = 0
            suggestions.append("Increase password length to at least 8 characters.")

        # Uppercase
        if re.search(r"[A-Z]", password):
            score += 1
            checks["uppercase"] = True
        else:
            suggestions.append("Add an uppercase letter.")

        # Lowercase
        if re.search(r"[a-z]", password):
            score += 1
            checks["lowercase"] = True
        else:
            suggestions.append("Add a lowercase letter.")

        # Number
        if re.search(r"\d", password):
            score += 1
            checks["number"] = True
        else:
            suggestions.append("Include at least one number.")

        # Special Character
        if re.search(r"[!@#$%^&*(),.?\":{}|<>]", password):
            score += 1
            checks["special"] = True
        else:
            suggestions.append("Include at least one special character.")

        # Strength
        if score <= 2:
            strength = "Weak"
            color = "red"
            roast = random.choice(WEAK_ROASTS)
            crack_time = "Less than 5 Minutes"
            risk = "HIGH"

        elif score <= 4:
            strength = "Medium"
            color = "orange"
            roast = random.choice(MEDIUM_ROASTS)
            crack_time = "Around 3 Months"
            risk = "MEDIUM"

        else:
            strength = "Strong"
            color = "green"
            roast = random.choice(STRONG_ROASTS)
            crack_time = "500+ Years"
            risk = "LOW"

        fact = random.choice(FACTS)

    return render_template(
        "index.html",
        password=password,
        score=score,
        strength=strength,
        color=color,
        roast=roast,
        crack_time=crack_time,
        risk=risk,
        fact=fact,
        checks=checks,
        suggestions=suggestions
    )


@app.route("/game")
def game():
    return render_template("game.html")


if __name__ == "__main__":
    app.run(debug=True)