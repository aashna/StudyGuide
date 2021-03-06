import csv

DATA_DIRECTORY = '../data/'
HEATMAP = DATA_DIRECTORY+ 'heatMaps_Engineering_CS145_Fall2014.csv'
f = open(HEATMAP,'r')

data = {}
dictofdata = csv.DictReader(f)
for row in dictofdata:
        if row['videoId'] not in data: data[row['videoId']] = []
        data[row['videoId']].append([row['videoId'],row['second'],row['numViews']])

#print data.keys()
print len(data.keys())

#i=1
for video in data.keys():
    with open(video+'.csv','wb') as csvfile:
        writer = csv.writer(csvfile,delimiter=',',quotechar='|', quoting=csv.QUOTE_MINIMAL)
        writer.writerow(['videoId','second','numViews'])
        for row in data[video]:
            writer.writerow(row)
    #i+=1
#print 'Generated ',i-1, ' CSVs'

# f = open('video_code_map.csv','r')

# data = {}
# dictofdata = csv.DictReader(f)
# for row in dictofdata:
#         if row['video_id'] not in data: data[row['video_id']] = ''
#         data[row['video_id']] = row['video_code']
# print data
