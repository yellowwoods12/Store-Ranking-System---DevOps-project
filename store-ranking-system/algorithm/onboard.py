import sqlite3
from datetime import date
def createLocker(infoLocker):
    """{'address': 'Delhi', 
    'zipcode': '201001', 
    'lockername': 'ABCD', 
    'num_of_locker': '12', 
    'daystring': '1110000', 
    'start_time': '07:00', 
    'end_time': '22:00', 
    'lattitude': 28.6517178, 
    'longitude': 77.2219388}"""
    con = sqlite3.connect("db.sqlite3")
    cur = con.cursor()
    #locker table
    pk=0
    for row in cur.execute('SELECT lockerid from locker_onboard'):
        if pk<row[0]:
            pk=row[0]
    pk = pk+1
    row=()
    row+=(pk,)
    row+=(infoLocker["lockername"],)
    row+=("India",)
    row+=(infoLocker["address"],)
    row+=(infoLocker["zipcode"],)
    row+=(int(infoLocker["num_of_locker"]),)
    row+=(infoLocker["lattitude"],)
    row+=(infoLocker["longitude"],)
    qryInsrt = """insert into locker_onboard
                (lockerid,
                name,
                country	,
                address,
                zipcode,
                total_slots,
                latitude,
                longitude) values (?,?,?,?,?,?,?,?)"""
    l=[]
    l.append(row)
    print(l)
    cur.executemany(qryInsrt,l)
    #occupancy table
    roccupy=()
    roccupy+=(pk,)
    today = date.today()
    roccupy+=(today,)
    roccupy+=(2.4,)
    qry="""insert into locker_occupancy(
            lockerid_id,date,occupancy) values (?,?,?)"""
    locc=[]
    locc.append(roccupy)
    print(locc)
    cur.executemany(qry,locc)
    #availability table
    ravail=()
    ravail+=(pk,)
    ravail+=(infoLocker['start_time'],)
    ravail+=(infoLocker['end_time'],)
    ravail+=(infoLocker["daystring"],)
    ravail+=(True,)

    qryy="""insert into locker_availability
            (lockerid_id,timings_open,
            timings_closed,
            non_del_days,status) values (?,?,?,?,?)"""
    lavail=[]
    lavail.append(ravail)
    print(lavail)
    cur.executemany(qryy,lavail)
    #rating table
    rrating=()
    rrating+=(pk,)
    rrating+=(2.5,)
    query="""insert into locker_rating
            (lockerid_id,rating) values (?,?)"""
    lrating=[]
    lrating.append(rrating)
    print(lrating)
    cur.executemany(query,lrating)
    #throughput table
    rthrough=()
    rthrough+=(pk,)
    rthrough+=(2.5,)
    queryy="""insert into locker_throughput
            (lockerid_id,throughput) values (?,?)"""
    lthrough=[]
    lthrough.append(rthrough)
    print(lthrough)
    cur.executemany(queryy,lthrough)

    con.commit()
    con.close()

