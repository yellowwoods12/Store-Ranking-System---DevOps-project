import sqlite3
def updateR(rows):
    con = sqlite3.connect("db.sqlite3")
    cur = con.cursor()
    cur.execute('delete from locker_rankinglist')
    qryInsrt = """insert into locker_rankinglist 
                (lockerid_id,
                name,
                country,
                address,
                zipcode,
                non_del_days,
                timings_open,
                timings_closed,
                status,
                dist,
                rank,
                score) values (?,?,?,?,?,?,?,?,?,?,?,?);"""
    cur.executemany(qryInsrt,rows)
    con.commit()
    print("RANKING DONE")
    con.close()