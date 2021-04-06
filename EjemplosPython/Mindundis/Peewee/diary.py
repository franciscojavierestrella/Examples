from peewee import *
import datetime
from collections import OrderedDict
import sys
from _ast import In

db = SqliteDatabase('diary.db')



class Entry(Model):
    # Content
    content = TextField()
    # timestamp
    timestamp = DateTimeField(default=datetime.datetime.now)
    
    class Meta:
        database = db

def create_and_connect():
    """ Coonect to the database and create the tables """
    db.connect()
    db.create_tables([Entry], safe = True)        

def menu_loop():
    """Show Menu """
    choice = None
    while choice != 'q':
        print (" Press 'q' to quit....")
        for key,value in menu.items():
            print ("{}) {}".format(key,value.__doc__))
        choice = input("Acction: ").lower().strip()
        
        if (choice in menu):
            menu[choice]()
        
    
def add_entry():
    """Add Entry """
    print(" Add an entry")
    print ("Enter your thoughts, press ctrl + d to finish")
    contents = []
    while True:
        line = input().strip()
        if line:
            contents.append(line)
        else:
            break
     
    if contents:
        choice = 'y'
        try:
            choice = input("Do you want to save your entry? (yn)").lower().strip()
        except EOFError:
            choice = 'n'
        if choice != 'n':
            cadena = ""
            for i in contents:
                cadena = cadena + str(i)
            Entry.create(content=cadena)
            print ("Your entry was saved successfully")


def view_entries(search_query=None):
    """View all entries """
    entries = Entry.select().order_by(Entry.timestamp.desc())
    
    if search_query:
        entries = entries.where(Entry.content.contains(search_query))        
    
    for entry in entries:
        timestamp = entry.timestamp.strftime('%A %B %d, %Y %I:%M%p')
        print ( timestamp)
        print ('+'*len(timestamp))
        print (entry.content)
        print ('n) next entry')
        print ('d) delete entry')
        print ('q) return to menu')
        
        next_action = input("Action: ").lower().strip()        
        if next_action == 'q':
            break
        elif next_action == 'd':
            delete_entry(entry)
    
    
def delete_entry(entry):
    """delete an Entry """
    action = input("Are you sure?[y/n]").lower().strip()
    
    if action == 'y':
        entry.delete_instance()

def search_entry():
    """Search an Entry """
    search_query = input("Search query: ").strip()
    view_entries(search_query)
    
menu = OrderedDict([
    ('a', add_entry),
    ('v', view_entries),
    ('s', search_entry),
    ])
    
if __name__ == '__main__':
    create_and_connect()
    menu_loop()
    

    