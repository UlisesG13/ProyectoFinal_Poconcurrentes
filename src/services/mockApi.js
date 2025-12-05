const db = {
  programs: [],
  quarters: [],
  subjects: [],
  teachers: [],
  students: [],
  groups: [],
}

function generateData() {
  const program = { id: 'p1', name: 'Ingeniería en Sistemas', quarters: 10 }
  db.programs.push(program)

  for (let q = 1; q <= program.quarters; q++) {
    db.quarters.push({ id: `q${q}`, programId: program.id, number: q })
  }

  let sid = 1
  for (let q = 1; q <= program.quarters; q++) {
    for (let i = 0; i < 7; i++) {
      db.subjects.push({ id: `s${sid}`, name: `Asignatura ${sid}`, quarter: q, programId: program.id })
      sid++
    }
  }

  const odd = [1, 3, 5, 7, 9]
  for (let t = 1; t <= 35; t++) {
    db.teachers.push({ id: `t${t}`, name: `Docente ${t}`, quarters: [odd[(t - 1) % odd.length]] })
  }

  let gid = 1
  let studentId = 1
  for (let g = 0; g < 35; g++) {
    const subject = db.subjects[g % db.subjects.length]
    const teacher = db.teachers[g % db.teachers.length]
    const group = { id: `g${gid}`, name: `Grupo ${gid}`, subjectId: subject.id, subjectName: subject.name, teacherId: teacher.id, teacherName: teacher.name, students: [] }
    for (let s = 0; s < 25; s++) {
      const student = { id: `stu${studentId}`, name: `Alumno ${studentId}`, matricula: `M${1000 + studentId}`, quarter: ((gid - 1) % 10) + 1, subjects: [subject.id] }
      db.students.push(student)
      group.students.push(student.id)
      studentId++
    }
    db.groups.push(group)
    gid++
  }
}

generateData()

function wait(ms = 200) {
  return new Promise((res) => setTimeout(res, ms))
}

export async function getPrograms() {
  await wait()
  return db.programs
}

export async function createProgram(payload) {
  await wait()
  const id = `p${db.programs.length + 1}`
  const program = { id, ...payload }
  db.programs.push(program)
  for (let q = 1; q <= program.quarters; q++) db.quarters.push({ id: `${id}-q${q}`, programId: id, number: q })
  return program
}

export async function getQuarters(programId) {
  await wait()
  return db.quarters.filter((q) => q.programId === programId || q.programId === 'p1')
}

export async function getSubjectsForQuarter(programId, quarterNumber) {
  await wait()
  return db.subjects.filter((s) => s.quarter === quarterNumber)
}

export async function getGroupsForSubject(subjectId) {
  await wait()
  return db.groups.filter((g) => g.subjectId === subjectId)
}

export async function getTeachers() {
  await wait()
  return db.teachers
}

export async function checkCourseExists(subjectId) {
  await wait()
  return Math.random() > 0.5
}

export async function checkUserExists(userId) {
  await wait()
  return db.students.some((s) => s.id === userId)
}

export async function createCourse(subject) {
  await wait()
  return { success: true, subject }
}

export async function createUserTeacher(teacher) {
  await wait()
  const id = `t${db.teachers.length + 1}`
  const t = { id, ...teacher }
  db.teachers.push(t)
  return t
}

export async function createAndEnrollStudents(groupId, students) {
  await wait()
  const group = db.groups.find((g) => g.id === groupId)
  if (!group) return { success: false }
  students.forEach((s) => {
    const id = `stu${db.students.length + 1}`
    const student = { id, ...s }
    db.students.push(student)
    group.students.push(student.id)
  })
  return { success: true }
}
