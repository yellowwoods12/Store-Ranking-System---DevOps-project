import sqlite3
def specs(lid):
    con = sqlite3.connect("db.sqlite3")
    cur = con.cursor()
    lid=str(lid)
    qry="""
    select 
    locker_availability.status, 
    locker_occupancy.occupancy,
    locker_rating.rating,
    locker_throughput.throughput
    from locker_availability, locker_occupancy, locker_rating, locker_throughput 
    where locker_availability.lockerid_id="""+lid+ """
    and locker_occupancy.lockerid_id="""+lid+"""
    and locker_rating.lockerid_id="""+lid+ """
    and locker_throughput.lockerid_id="""+lid+ """
    and locker_occupancy.date=(SELECT MAX(date)
                FROM locker_occupancy
                WHERE lockerid_id="""+lid+ """);
    """
    for row in cur.execute(qry):
        specsRow = row
    con.close()
    return specsRow