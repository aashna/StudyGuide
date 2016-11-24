import csv
import os

DATA_DIRECTORY = '../data/'
VIDEO_INTERACTION_FILE = DATA_DIRECTORY+ 'Engineering_CS145_Fall2014_VideoInteraction.csv'

f = open(VIDEO_INTERACTION_FILE,'r')

data = {}
dictofdata = csv.DictReader(f)
for row in dictofdata:
        if (row['anon_screen_name']) not in data: data[(row['anon_screen_name'])] = {}
        if row['video_id'] not in data[(row['anon_screen_name'])]: data[(row['anon_screen_name'])][row['video_id']]=[]
        data[(row['anon_screen_name'])][row['video_id']].append([row['time'],row['event_type'],row['video_current_time'],row['video_new_speed'],row['video_old_speed'],row['video_old_time'],row['video_current_time'],row['video_seek_type']])
#print data

for key in data.keys():
    directory = DATA_DIRECTORY+ 'interactions/'+key
    if not os.path.exists(directory):
        os.makedirs(directory)
    student_map = data[key]
    for video in student_map.keys():
        f = open(directory+'/'+video+'.csv','wb')
        writer = csv.writer(f)
        record = student_map[video]
        record = sorted(record,key =lambda k: k[0])
        writer.writerow(['wall_time','event_type','video_current_time','video_new_speed','video_old_speed','video_current_time','video_seek_type'])
        for r in record:
           writer.writerow(r)
    print 'Record written for ',key

#print data
