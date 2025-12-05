# Diseño de la base de datos adicional (esquema)

Tablas requeridas:

- ProgramaDeEstudio
  - id (string, PK)
  - nombre (string)
  - cuatrimestres (int)

- Asignatura
  - id (string, PK)
  - nombre (string)
  - cuatrimestre (int)
  - programaId (FK -> ProgramaDeEstudio.id)

- Docente
  - id (string, PK)
  - nombre (string)
  - asignaturas (array / relación n:m en tabla intermedia si es relacional)

- Grupo
  - id (string, PK)
  - nombre (string)
  - asignaturaId (FK -> Asignatura.id)
  - docenteId (FK -> Docente.id)
  - alumnos (lista de ids o tabla intermedia grupo_alumno)

- Alumno
  - id (string, PK)
  - nombre (string)
  - matricula (string)
  - cuatrimestre (int)
  - asignaturas (array / relación n:m)


Población de ejemplo (requerida por la especificación):
- 1 Programa de estudio
- 10 cuatrimestres
- 70 asignaturas (7 por cuatrimestre)
- 35 docentes (imparten materias de los cuatrimestres impares 1,3,5,7 y 9)
- 35 grupos (25 alumnos por grupo) -> 875 alumnos

Notas de implementación:
- En una base de datos relacional crear tablas intermedias para relaciones n:m (por ejemplo `docente_asignatura`, `alumno_asignatura`, `grupo_alumno`).
- Para poblar la base: crear un script que genere asignaturas por cuatrimestre, cree docentes y asignelos a asignaturas de cuatrimestres impares, cree grupos y agregue 25 alumnos por grupo.
