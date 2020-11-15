import sqlite3
import math
#returns list of row in the following format:
"""lockerid_id,name,country,address,zipcode,non_del_days,
    timings_open,timings_closed,status,latitude,longitude,
    dist,dummyRank"""


def calcDist(lat1,lat2,lon1,lon2):
    R = 6373.0 #radius of the Earth
    lat1 = math.radians(lat1)
    lon1 = math.radians(lon1)
    lat2 = math.radians(lat2)
    lon2 = math.radians(lon2)
    dlon = lon2 - lon1
    #change in coordinates
    dlat = lat2 - lat1
    a = math.sin(dlat / 2)**2 + math.cos(lat1) * math.cos(lat2) * math.sin(dlon / 2)**2
    #Haversine formula
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
    distance = R * c
    return distance


def getrows(x,y):
    con = sqlite3.connect("db.sqlite3")
    cur = con.cursor()
    cur.execute('delete from locker_rankinglist')
    counter = 0
    lmt=0.1
    while counter<20:
        counter=0
        lmt=lmt+0.1
        qry="""select locker_availability.lockerid_id,
                locker_onboard.name,
                locker_onboard.country,
                locker_onboard.address,
                locker_onboard.zipcode,
                locker_availability.non_del_days,
                locker_availability.timings_open,
                locker_availability.timings_closed,
                locker_availability.status,
                locker_onboard.latitude,
                locker_onboard.longitude 
                from locker_onboard,locker_availability
                where 
                locker_availability.lockerid_id = locker_onboard.lockerid
                and
                locker_onboard.latitude 
                between """+str(x-lmt)+""" AND """+str(x+lmt)+""" and 
                locker_onboard.longitude 
                between """+str(y-lmt)+""" AND """+str(y+lmt)+""";"""
        lstRow=[]
        dummyRank=0
        for row in cur.execute(qry):
            if row[8]==1:
                dist=calcDist(x,row[9],y,row[10])
                row=row[:9]
                dist=math.sqrt(dist)
                row+=(dist,)
                row+=(dummyRank,)
                if dist<5:
                    lstRow.append(row)
                counter+=1
    con.commit()
    con.close()
    print("ROW FETCHED")
    return lstRow