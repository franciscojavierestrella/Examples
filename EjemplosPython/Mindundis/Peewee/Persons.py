'''
Created on 30 mar. 2021

@author: javi
'''

from peewee import *
from datetime import date
from test.test_importlib import test_namespace_pkgs

db = SqliteDatabase('people.db')

class Person(Model):
    name = CharField()
    birthday = DateField()

    class Meta:
        database = db # This model uses the "people.db" database.
        
        
class Pet(Model):
    owner = ForeignKeyField(Person, backref='pets')
    name = CharField()
    animal_type = CharField()

    class Meta:
        database = db # this model uses the "people.db" database        
        
def create_and_connect():
    db.connect();
    db.create_tables([Person, Pet], safe = True)
    
    
create_and_connect()

#===============================================================================
# uncle_bob = Person(name='Bob', birthday=date(1960, 1, 15))
# uncle_bob.save() # bob is now stored in the database
#  
# grandma = Person.create(name='Grandma', birthday=date(1935, 3, 1))
# herb = Person.create(name='Herb', birthday=date(1950, 5, 5))
# 
# grandma = Person.select().where(Person.name == 'Grandma').get()
#  
# grandma.name = 'Grandma L.'
# grandma.save()  # Update grandma's name in the database.
#  
# uncle_bob = Person.get(Person.name == 'Bob')
# herb = Person.get(Person.name == 'Herb')
#  
# bob_kitty = Pet.create(owner=uncle_bob, name='Kitty', animal_type='cat')
# herb_fido = Pet.create(owner=herb, name='Fido', animal_type='dog')
# herb_mittens = Pet.create(owner=herb, name='Mittens', animal_type='cat')
# herb_mittens_jr = Pet.create(owner=herb, name='Mittens Jr', animal_type='cat')
#    
#  
# bob_kitty = Pet.get(Pet.name=='Kitty')
# herb_fido = Pet.get(Pet.name=='Fido')
# herb_mittens_jr = Pet.get(Pet.name=='Mittens Jr')
# 
# herb_mittens = Pet.get(Pet.name=='Mittens')
# herb_mittens.delete_instance() # he had a great life
#  
# herb_fido.owner = uncle_bob
# herb_fido.save()
#===============================================================================

#===============================================================================
# for person in Person.select():
#     print(person.name)
# 
# print("\n");
#     
# query = Pet.select().where(Pet.animal_type == 'cat')
# for pet in query:
#     print(pet.name)
# 
# print("\n");
#     
# for pet in Pet.select().join(Person).where(Person.name == 'Bob'):
#     print(pet.name, pet.owner.name)
# 
# print("\n");
# 
# uncle_bob = Person.get(Person.name == 'Bob')
# for pet in Pet.select().where(Pet.owner == uncle_bob).order_by(Pet.name):
#     print(pet.name)
#     
# 
# print("\n");
# 
# d1940 = date(1940, 1, 1)
# d1960 = date(1960, 1, 1)
# query = (Person
#          .select()
#          .where((Person.birthday < d1940) | (Person.birthday > d1960)))
# 
# for person in query:
#     print(person.name, person.birthday)
# 
# print("\n");
#     
# query = (Person
#          .select()
#          .where(Person.birthday.between(d1940, d1960)))
# 
# for person in query:
#     print(person.name, person.birthday)    
#===============================================================================

def get_relation():
    print("\n");    
        
    for person in Person.select():
        print(person.name, person.pets.count(), 'pets')
      
    print("\n");    
    
    query = (Person
             .select(Person, fn.COUNT(Pet.id).alias('pet_count'))
             .join(Pet, JOIN.LEFT_OUTER)  # include people without pets.
             .group_by(Person)
             .order_by(Person.name))
    
    for person in query:
        # "pet_count" becomes an attribute on the returned model instances.
        print(person.name, person.pet_count, 'pets')
     
    print("\n");    
    
    query = (Person
             .select(Person, Pet)
             .join(Pet, JOIN.LEFT_OUTER)
             .order_by(Person.name, Pet.name))
    for person in query:
        # We need to check if they have a pet instance attached, since not all
        # people have pets.
        if hasattr(person, 'pet'):
            print(person.name, person.pet.name)
        else:
            print(person.name, 'no pets')    


def delete_pet(name):
    query = Pet.delete().where(Pet.name == name)
    query_results = query.execute()
    print(" {} registros borrados".format(query_results))
    
    
delete_pet("Fido")