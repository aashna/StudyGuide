import csv

f = open('heatMaps_Engineering_CS145_Fall2014.csv','r')

data = {}
dictofdata = csv.DictReader(f)
for row in dictofdata:
        if row['videoId'] not in data: data[row['videoId']] = []
        data[row['videoId']].append([row['videoId'],row['second'],row['numViews']])

#print data.keys()
print len(data.keys())

i=1
for video in data.keys():
    with open(str(i)+'.csv','wb') as csvfile:
        writer = csv.writer(csvfile,delimiter=',',quotechar='|', quoting=csv.QUOTE_MINIMAL)
        writer.writerow(['videoId','second','numViews'])
        for row in data[video]:
            writer.writerow(row)
    i+=1
print 'Generated ',i-1, ' CSVs'

