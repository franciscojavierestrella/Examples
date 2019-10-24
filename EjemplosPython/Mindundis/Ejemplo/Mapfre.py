# -*- coding: utf-8 -*-
'''
Created on 9 ene. 2019

@author: javi
'''
from datetime import datetime, timedelta
import random
from random import randrange
import sys
from _ast import Num
import time


def creaFUsu(fichero, num):
    try:
        f = open(fichero, 'w+')
        for i in range(num):
            # Elementos de cada entrada
            email = "ZZBB" + str(i) + "@MAPFRE.COM"
            nuuma = "ZZBB" + str(i)
            nombre = "ZZBB" + str(i)
            apellido = "ZZBB" + str(i)
            perfilSAP2 = "Z2"
            upn = "ZZBB" + str(i) + "@MAPFRE.NET"
            numeroEmpleado = 7990 + i
            sociedad = "0001"
            ceco = get_CECO()
            f.write(email + ';M;' + nuuma + ';' + ceco + ";" + nombre + ';' + apellido + ';;;' + perfilSAP2 + ';' + upn + ';' + str(numeroEmpleado) + ';;;' + sociedad + ';;;;' + '\n')
        f.close()
    except Exception as e:
        print('Exception en funcion de creaF')
        sys.exit(-1)


def get_CECO():
    # sociedad R160 lista = ["1000008111","1000008200","1000008300","1000008302","1000008303","1000009230","1000009997","1000009999"]
    # lista = ["0000002987","0000002993","0000002984","0000003011","0000003028","0000003032","0000003033","0000003036"]
    lista = ["0000000001", "0000000002", "0000000003", "0000000004", "0000000005", "0000000006", "0000000007", "0000000008"]
    return random.choice(lista)


def get_fecha(start, end, fmt="%d/%m/%Y"):
    s = datetime.strptime(start, fmt)
    e = datetime.strptime(end, fmt)    
    delta = e - s
    while True:
        r = s + timedelta(days=(randrange(0, 12) * randrange(0, 31)))
        midelta = e - r
        if midelta.days > 0 and midelta.days < delta.days:
            break
    return r.strftime(fmt)


def get_idSAP():
    lista = ["MVIL17", "MGAR093", "lgcarlo"]
    return random.choice(lista)

    
def get_destino():
    lista = ["Sevilla", "Madrid", "Barcelona", "Roma", "Paris", "Londres"]
    return random.choice(lista)


def get_actividad():
    lista = ["5", "6", "8", "Z"]
    return random.choice(lista)


def get_centro_de_coste():
    lista = ["9978", "9477", "9485", "9479"]
    return random.choice(lista)


def get_categoria():
    lista = ["16", "18", "19", "22", "23", "24", "26", "27", "29", "30", "35", "36", "37", "38", "39", "40", "41", "42", "43", "45", "46", "47", "51", "52", "53", "54", "55", "56"]
    return random.choice(lista)


def get_motivo():
    lista = ["Formacion", "motivo formacion", "kick off", "Datos"]
    return random.choice(lista)


def get_comentario():
    lista = ["Prueba", "Test"]
    return random.choice(lista)


def get_importe():

    pasta = random.randint(1, 10000)
    centimos = random.randint(0, 99)
    importe = str(pasta).zfill(2) + "," + str(centimos).zfill(2)
    return importe


def get_codeusuario(inicio, fin):
    code = random.randint(inicio, fin)
    return str(code)


def get_gasto_personal():

    lista = ["45", "46", "47", "48"]
    return random.choice(lista)


def get_tipoGasto():

    lista = ["ticket", "km"]
    return random.choice(lista)


def get_gasto(id, nombreSolicitud, idSap, fechaInicio, fechaFin, destino, act, ceco, motivo, comentario):
    id_solicitud = id
    nombre_solicitud = nombreSolicitud
    id_sap = idSap
    fecha_inicio_liquidacion = fechaInicio + " 00:00"
    fecha_fin_liquidacion = fechaFin + " 23:59"
    estado = "Aprobado"
    primer_destino = destino
    actividad = act
    centro_de_coste = ceco
    motivo_viaje = motivo
    pais_liquidacion = "ES"
    comentario = comentario
    id_gasto_sap = "1"
    proveedor_gasto = ""
    fecha_gasto = get_fecha(fechaInicio, fechaFin)
    categoria_gasto = get_categoria()
    forma_pago_gasto = "1"
    distancia = ""
    ciudad_origen = ""
    ciudad_destino = ""
    descripcion = ""
    comentario_gasto = ""
    importe_gasto = get_importe()
    gasto_personal = get_gasto_personal()
    moneda_gasto = "EUR"
    numero_asistentes = "1"
    asistentes_externos = ""
    asistentes_internos = "19280"
    
    gasto = id_solicitud + ";" + nombre_solicitud + ";" + id_sap + ";" + fecha_inicio_liquidacion + ";" + fecha_fin_liquidacion + ";" + estado + ";" + primer_destino + ";" + actividad + ";" + centro_de_coste + ";" + motivo_viaje + ";" + pais_liquidacion + ";" + comentario + ";" + id_gasto_sap + ";" + proveedor_gasto + ";" + fecha_gasto + ";" + categoria_gasto + ";" + forma_pago_gasto + ";" + distancia + ";" + ciudad_origen + ";" + ciudad_destino + ";" + descripcion + ";" + comentario_gasto + ";" + importe_gasto + ";" + gasto_personal + ";" + moneda_gasto + ";" + numero_asistentes + ";" + asistentes_externos + ";" + asistentes_internos 
    
    return gasto


def get_km(id, nombreSolicitud, idSap, fechaInicio, fechaFin, destino, act, ceco, motivo, comentario):
    id_solicitud = id
    nombre_solicitud = nombreSolicitud
    id_sap = idSap
    fecha_inicio_liquidacion = fechaInicio + " 00:00"
    fecha_fin_liquidacion = fechaFin + " 23:59"
    estado = "Aprobado"
    primer_destino = destino
    actividad = act
    centro_de_coste = ceco
    motivo_viaje = motivo
    pais_liquidacion = "ES"
    comentario = comentario
    id_gasto_sap = "1"
    proveedor_gasto = ""
    fecha_gasto = get_fecha(fechaInicio, fechaFin)
    categoria_gasto = get_categoria()
    forma_pago_gasto = "1"
    distancia = "23.00"
    ciudad_origen = "Ciudad 1"
    ciudad_destino = "Ciudad 2"
    descripcion = ""
    comentario_gasto = ""
    importe_gasto = get_importe()
    gasto_personal = ""
    moneda_gasto = "EUR"
    numero_asistentes = ""
    asistentes_externos = ""
    asistentes_internos = ""
    
    km = id_solicitud + ";" + nombre_solicitud + ";" + id_sap + ";" + fecha_inicio_liquidacion + ";" + fecha_fin_liquidacion + ";" + estado + ";" + primer_destino + ";" + actividad + ";" + centro_de_coste + ";" + motivo_viaje + ";" + pais_liquidacion + ";" + comentario + ";" + id_gasto_sap + ";" + proveedor_gasto + ";" + fecha_gasto + ";" + categoria_gasto + ";" + forma_pago_gasto + ";" + distancia + ";" + ciudad_origen + ";" + ciudad_destino + ";" + descripcion + ";" + comentario_gasto + ";" + importe_gasto + ";" + gasto_personal + ";" + moneda_gasto + ";" + numero_asistentes + ";" + asistentes_externos + ";" + asistentes_internos 
    return km


def creaFLI(fichero, num, usuarioinicio, usuariofin):
    try:
        f = open(fichero, 'w+')
        for i in range(num):
            id_solicitud = "5555" + str(i)
            nombre_solicitud = id_solicitud + "_" + get_destino() + "_" + "82987329873987"
#             if i<10:
#                 id_sap = get_idSAP()
#             else:
#                 id_sap = "ZZBB"+str(i)
            id_sap = "ZZBB" + get_codeusuario(usuarioinicio, usuariofin)
            fecha_inicio_liquidacion = "54654"  # get_fecha("01/01/2018","01/02/2018")
            fecha_fin_liquidacion = "64645"  # get_fecha(fecha_inicio_liquidacion, "01/03/2018")
            primer_destino = "NPI"  # get_destino()
            actividad = "3"  # get_actividad()
            centro_de_coste = "989128"  # get_centro_de_coste()
            motivo_viaje = "MM"  # get_motivo()
            comentario = "kjkjljljlk"  # get_comentario()
            # numGastos = random.randint(1, 5)
            for j in range(0, 3):
                linea = ""
                if get_tipoGasto() == "ticket":
                    linea = get_gasto(id_solicitud, nombre_solicitud, id_sap, fecha_inicio_liquidacion, fecha_fin_liquidacion, primer_destino, actividad, centro_de_coste, motivo_viaje, comentario)   
                else:
                    linea = get_km(id_solicitud, nombre_solicitud, id_sap, fecha_inicio_liquidacion, fecha_fin_liquidacion, primer_destino, actividad, centro_de_coste, motivo_viaje, comentario)
                print (linea)
                # linea = get_km(id_solicitud,nombre_solicitud,id_sap,fecha_inicio_liquidacion,fecha_fin_liquidacion,primer_destino,actividad,centro_de_coste,motivo_viaje,comentario)
                f.write(linea + "\n")                             
            print("Liquidacion linea " + str(i) + "\n")
        f.close()
    except Exception as e:
        print('Exception en funcion de creaF')
        sys.exit(-1)


# creaFUsu('UsuariosMapfre_20181202.csv', 3000)
creaFLI('LiquidacionMapfre_20190109-1.csv', 2500, 1, 100)
# creaFLI('LiquidacionMapfre_20190109-2.csv', 4, 101, 200)
# creaFLI('LiquidacionMapfre_20190109-3.csv', 4, 201, 300)
# creaFLI('LiquidacionMapfre_20190109-4.csv', 4, 301, 400)
