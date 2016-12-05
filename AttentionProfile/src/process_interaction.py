import csv
import os
from datetime import datetime


DATA_DIRECTORY = '../data/'
VIDEO_INTERACTION_FILE = DATA_DIRECTORY+ 'Engineering_CS145_Fall2014_VideoInteraction.csv'


def create_csvs():
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
            writer.writerow(['wall_time','event_type','video_current_time','video_new_speed','video_old_speed','video_old_time','video_current_time','video_seek_type'])
            for r in record:
               writer.writerow(r)
        print 'Record written for ',key

def get_timestamp_difference(t1,t2):
    # print t1,
    # print t2
    d1 = datetime.strptime(t1, "%Y-%m-%d %H:%M:%S.%f")
    d2 = datetime.strptime(t2, "%Y-%m-%d %H:%M:%S.%f")
    diff = d2-d1
    return diff.seconds

def get_pause_times(filepath):
    #print filepath
    data = {}
    f = open(filepath,'r')
    dictofdata = csv.DictReader(f)
    t1,t2=-1,-1
    video_new_speed = 1
    for row in dictofdata:
        if row['video_current_time'] and row['video_current_time']!='None':data[int(float(row['video_current_time']))]=0
        if row['event_type'] == 'pause_video': t1=row['wall_time'] 
        elif row['event_type'] == 'play_video' and t1>-1:
            t2 = row['wall_time']
            data[int(float(row['video_current_time']))] = float(get_timestamp_difference(t1,t2))*float(video_new_speed)
            t1,t2 = -1,-1
        elif row['event_type'] == 'stop_video' or row['event_type'] == 'load_video' or row['event_type'] == 'seek_video': t1=-1
        elif row['event_type'] == 'speed_change_video': video_new_speed = row['video_new_speed']
        #print data
    #print data
    filename = filepath.split('/')[-1]
    #print 'filename = ',filename
    f_out = open(DATA_DIRECTORY+filepath.split('/')[3]+'/'+filepath.split('/')[4]+ '/pause_'+filename,'wb')
    writer = csv.writer(f_out)
    writer.writerow(['video_current_time','pause_time'])
    for key in data: writer.writerow([key,data[key]])


for subdir, dirs, files in os.walk(DATA_DIRECTORY+'/interactions'):
    for file in files: 
        if 'pause' in file or '.DS_Store' in file: continue
        get_pause_times(subdir+'/'+file)
    print 'Processed: ',subdir.split('/')[-1]
                




