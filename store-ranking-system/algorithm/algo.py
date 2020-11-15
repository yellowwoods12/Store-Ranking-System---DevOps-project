from algorithm import getRows
from algorithm import getSpecs
from algorithm import updRankingList
from algorithm import MaxMin
import operator

def algoFun(qry):
    x=qry["lattitude"]
    y=qry["longitude"]
    lockers=getRows.getrows(x,y)
    if len(lockers)==0:
        return
    #GETTING SPECIFICATIONS
    #specLocker: [[lockerlockers_id,occupancy,rating,throughput,dist],..]
    specLocker=[]
    for row in lockers:
        x=getSpecs.specs(row[0])
        if x[0]==1:
            x=list(x)
            x.pop(0)
            x.insert(0,row[0])
            x.append(row[9])     
            specLocker.append(x)
    

    #NORMALISING SPECIFICATIONS
    specs = ["N","S","B","B","S"]
    for i in range (1,5):
        mxVal=MaxMin.getMax(specLocker,i)
        mnVal=MaxMin.getMin(specLocker,i)
        itrvl = (mxVal-mnVal)/10
        for x in specLocker:
            if specs[i]=="S":
                x[i]=(x[i]-mnVal)/itrvl
            else:
                x[i]=10-((x[i]-mnVal)/itrvl)
    
    #CALCULATING SCORES
    scoreCalc=[]
    weights= {
        "wt_occ":0.1,
        "wt_rating":0.02,
        "wt_thrput":0.02,
        "wt_proximity":0.7,
    }

    for x in specLocker:
        y=[]
        score= weights["wt_occ"]*x[1]+weights["wt_rating"]*x[2]+weights["wt_thrput"]*x[3]+weights["wt_proximity"]*x[4]
        y.append(score)
        y.append(x[0])
        scoreCalc.append(y)
    
    scoreCalc.sort(reverse=True)

    rankDictry={}
    scoreDictry={}
    rank=1
    for x in scoreCalc:
        rankDictry.update( {x[1] : rank} )
        scoreDictry.update( {x[1] : x[0]} )
        rank=rank+1

    finalLockers=[]

    for x in lockers:
        if x[8]==1:
            y=list(x)
            y[10]=rankDictry[y[0]]
            z=tuple(y)
            z+=(scoreDictry[y[0]],)
            finalLockers.append(z)

    finalLockers.sort(key = operator.itemgetter(10))
    updRankingList.updateR(finalLockers)