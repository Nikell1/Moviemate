from fastapi import APIRouter, HTTPException, status,Security

from adapters.db_source import DatabaseAdapter
from fastapi.security import HTTPBearer
from utils.functions import get_user

router = APIRouter()
Bear = HTTPBearer(auto_error=False)

@router.post("/friend", status_code=status.HTTP_200_OK)
async def add_friend(friend_login:str, token:str = Security(Bear)):
    user = get_user(token.credentials)
    if user == []:
        raise HTTPException(status_code=401, detail="Invalid token")
    user = user[0]
    db = DatabaseAdapter()
    db.connect()


    email_check = db.get_by_value('users', 'email', user["email"])
    friend = db.get_by_value('users', 'login', friend_login)

    if len(email_check) == 0:
        raise HTTPException(status_code=404, detail="User with this email does not exists")
    if friend_login == user['login']:
        raise HTTPException(status_code=400, detail="Self Invite")
    if friend == []:
        raise HTTPException(status_code=404, detail="No user found")

    print(email_check)
    print(friend_login)

    check_if_already_pending = f"""SELECT * FROM friends WHERE user1='{user['login']}'"""
    check_invited = f"""SELECT * FROM friends WHERE user2='{user['login']}'"""

    check_if_already_pending = db.execute_with_request(check_if_already_pending)
    check_invited = db.execute_with_request(check_invited)

    if check_if_already_pending != []:
        raise HTTPException(status_code=409, detail="Already sent invite")

    if check_invited != []:
        request = f"""UPDATE friends SET status='complete' WHERE user1='{check_invited[0]['user1']}' and user2='{check_invited[0]['user2']}'"""
        db.execute_with_request(request)
        return {"ok": True, "detail": "Confirmed"}

    request = {
        "user1": user["login"],
        "user2": friend_login,
        "status": "pending"
    }
    db.insert('friends', request)

    return {"ok": True, "detail": "Invitation Sent"}


@router.delete("/friend", status_code=status.HTTP_204_NO_CONTENT)
async def add_friend(friend_login:str, token:str = Security(Bear)):
    user = get_user(token.credentials)
    if user == []:
        raise HTTPException(status_code=401, detail="Invalid token")
    user = user[0]
    db = DatabaseAdapter()
    db.connect()


    email_check = db.get_by_value('users', 'email', user["email"])
    friend = db.get_by_value('users', 'login', friend_login)

    if len(email_check) == 0:
        raise HTTPException(status_code=404, detail="User with this email does not exists")
    if friend_login == user['login']:
        raise HTTPException(status_code=400, detail="Self Invite")
    if friend == []:
        raise HTTPException(status_code=404, detail="No user found")

    print(email_check)
    print(friend_login)

    request = f"""SELECT * FROM friends WHERE (user1='{friend_login}' and user2='{user['login']}') or (user1='{user['login']}' and user2='{friend_login}')"""
    check_friendship = db.execute_with_request(request)


    if check_friendship == []:
        raise HTTPException(status_code=403, detail="No Friendship or Invitation")
    check_friendship = check_friendship[0]

    request = f"""DELETE FROM friends WHERE user1='{check_friendship['user1']}' and user2='{check_friendship['user2']}'"""
    db.execute_with_request(request)



@router.get("/friend", status_code=status.HTTP_200_OK)
async def add_friend(token:str = Security(Bear)):
    user = get_user(token.credentials)
    if user == []:
        raise HTTPException(status_code=401, detail="Invalid token")
    user = user[0]
    db = DatabaseAdapter()
    db.connect()


    email_check = db.get_by_value('users', 'email', user["email"])

    if len(email_check) == 0:
        raise HTTPException(status_code=404, detail="User with this email does not exists")

    request = f"""SELECT * FROM friends WHERE user1='{user['login']}' or user2='{user['login']}'"""
    friends = db.execute_with_request(request)

    n_fr = []
    for i in friends:
        if i["use1"] == user['login']:
            n_fr.append(i['user2'])
        else:
            n_fr.append(i['user1'])

    return n_fr