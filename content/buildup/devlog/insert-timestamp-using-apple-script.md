#devlog #applescript #automator

# Untitled

- {{speaker/author}}
- [{{source}}](https://claude.ai/chat/%7B%7Blink%7D%7D)
- 2025-08-03

---

### ✅ Option 1: Using Automator + AppleScript (No 3rd-party tools)

#### Step 1: Create the AppleScript

1. Open the **Script Editor**.
    
2. Paste this AppleScript:
    

applescript

CopyEdit

`set timeStamp to do shell script "date '+%Y.%m.%d %H:%M'" tell application "System Events"     keystroke timeStamp end tell`

3. Save it as an **Application**, for example: `InsertTimestamp.app`.

## ✅ Fix for "System Events is not allowed to send keystrokes"

### 🔧 Step 1: Give Accessibility Permissions

1. Open **System Settings** → **Privacy & Security** → **Accessibility**.
    
2. Click the **“+”** button and add:
    
    - **Automator** (if you're running the Quick Action)
        
    - **Script Editor** (if you're testing from there)
        
    - **InsertTimestamp.app** (if you saved your script as an app)
        
    - **Any other app** running the script
        
3. **Make sure the checkboxes are ON** for all of them.
    

> If you're using the Quick Action, also check that **“System Events” is allowed in Automation** under **Privacy & Security → Automation**.

