def getMax(lst,idx):
    mx=lst[0][idx]
    for x in lst:
        if mx>x[idx]:
            mx=x[idx]
    return mx

def getMin(lst,idx):
    mn=lst[0][idx]
    for x in lst:
        if mn<x[idx]:
            mn=x[idx]
    return mn
