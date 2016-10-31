import csv
import os

'''
This function processes heatMaps_Engineering_CS145_Fall2014.csv and creates a csv file for each video
in data/totalViews containing videoId, second, numViews
'''
def processHeatMapsEngineering():
    f = open('heatMaps_Engineering_CS145_Fall2014.csv','r')
    
    # Creates a map with key=video, value=  video,second,numViews
    data = {}
    dictofdata = csv.DictReader(f)
    for row in dictofdata:
            if row['videoId'] not in data: data[row['videoId']] = []
            data[row['videoId']].append([row['videoId'],row['second'],row['numViews']])

    print len(data.keys())
    
    # writes a csv file for each video (anonymized as 1,2,3..)
    i=1
    for video in data.keys():
        with open(str(i)+'.csv','wb') as csvfile:
            writer = csv.writer(csvfile,delimiter=',',quotechar='|', quoting=csv.QUOTE_MINIMAL)
            writer.writerow(['videoId','second','numViews'])
            for row in data[video]:
                writer.writerow(row)
        i+=1
    print 'Generated ',i-1, ' CSVs'

'''
This function processes heatMaps_Individual_Engineering_CS145_Fall2014.csv and creates a directory
data/individualViews/anon_screen_name for each student in the file and within each such directory,
it creates a csv file for each video the student watches (containing videoId, second, numViews)
'''
def processHeatMapsIndividualEngineering():
    f = open('heatMaps_Individual_Engineering_CS145_Fall2014.csv','r')

    # Creates a map where key=anon_screen_name, value = anon_screen_name, videoId, second, numViews
    userToVideoMap = {}
    dictofdata = csv.DictReader(f)
    videos = set()
    for row in dictofdata:
        if row['anon_screen_name'] not in userToVideoMap: userToVideoMap[row['anon_screen_name']] = []
        userToVideoMap[row['anon_screen_name']].append(row)
        videos.add(row['videoId'])
   # For each anon_screen_name in map, generates separate csv file for each video
    for student in userToVideoMap:
        videoMap = {}
        directory = 'data/individualViews/'+student
        if not os.path.exists(directory):
           os.makedirs(directory)
        print 'Created directory: ',directory
        for row in userToVideoMap[student]:
            if row['videoId'] not in videoMap: videoMap[row['videoId']] = []
            videoMap[row['videoId']].append([row['videoId'],row['second'],row['numViews']])

        for video in videoMap:
          with open(directory+'/'+video+'.csv','wb') as csvfile:
            writer = csv.writer(csvfile,delimiter=',',quotechar='|', quoting=csv.QUOTE_MINIMAL)
            writer.writerow(['videoId','second','numViews'])
            for row in videoMap[video]:
                writer.writerow(row)

    # print len(userToVideoMap.keys()),
    # print 'students'

    # for key in userToVideoMap:
    #     print len(userToVideoMap[key]),',',
    # print
    # print userToVideoMap[userToVideoMap.keys()[0]]
processHeatMapsIndividualEngineering()
