import axios from "axios";

// let token = localStorage.getItem("token");

// let config = {
//   headers: { Authorization: `Bearer ${token}` },
// };

// export function getHeader() {
//   let token = localStorage.getItem("token");
//   let config = {
//     headers: { Authorization: `Bearer ${token}` },
//   };
//   return config;
// }

const authapi = "https://localhost:44370/api/";

//Login
export async function login(obj) {
  try {
    const promise = await axios.post(authapi + "Auth/GetToken/login", obj);
    //console.log(promise);
    return promise;
  } catch (error) {
    console.error("can't Login  : " + error);
    return [];
  }
}

//////////////////////////////////////////////////////////////////////////////////////////////////

//Users
export async function GetAllUsers() {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const promise = await axios.get(authapi + "Users/GetAllUsers", config);
    //console.log(promise);
    return promise;
  } catch (error) {
    console.error("can't get data : " + error);
  }
}

export async function register(obj) {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const promise = await axios.post(
      authapi + "Auth/Register/register",
      obj,
      config
    );
    //console.log(promise);
    return promise;
  } catch (error) {
    console.error("can't add object : " + error);
    return [];
  }
}

export async function UpdateUser(Id, obj) {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const promise = await axios.put(
      authapi + "Users/UpdateUser/" + Id,
      obj,
      config
    );
    //console.log(promise);
    return promise;
  } catch (error) {
    console.error("can't update object : " + error);
    return [];
  }
}

export async function DeleteUser(Id) {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const promise = await axios.delete(
      authapi + "Users/DeleteUser/" + Id,
      config
    );
    //console.log(promise);
    return promise;
  } catch (error) {
    console.error("can't delete object : " + error);
    return [];
  }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Grades
export async function GetAllGrades() {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const promise = await axios.get(authapi + "Grades/GetAllGrades", config);
    //console.log(promise);
    return promise;
  } catch (error) {
    console.error("can't get data : " + error);
  }
}

export async function GetAllActiveGrades() {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const promise = await axios.get(
      authapi + "Grades/GetAllActiveGrades",
      config
    );
    //console.log(promise);
    return promise;
  } catch (error) {
    console.error("can't get data : " + error);
  }
}

export async function CreateGrade(obj) {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const promise = await axios.post(
      authapi + "Grades/CreateGrade",
      obj,
      config
    );
    //console.log(promise);
    return promise;
  } catch (error) {
    console.error("can't add object : " + error);
    return [];
  }
}

export async function UpdateGrade(Id, obj) {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const promise = await axios.put(
      authapi + "Grades/UpdateGrade/" + Id,
      obj,
      config
    );
    //console.log(promise);
    return promise;
  } catch (error) {
    console.error("can't update object : " + error);
    return [];
  }
}

export async function DeleteGrade(Id) {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const promise = await axios.delete(
      authapi + "Grades/DeleteGrade/" + Id,
      config
    );
    //console.log(promise);
    return promise;
  } catch (error) {
    console.error("can't delete object : " + error);
    return [];
  }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Courses
export async function GetAllCourses() {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const promise = await axios.get(authapi + "Courses/GetAllCourses", config);
    //console.log(promise);
    return promise;
  } catch (error) {
    console.error("can't get data : " + error);
  }
}

export async function CreateCourse(obj) {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const promise = await axios.post(
      authapi + "Courses/CreateCourse",
      obj,
      config
    );
    //console.log(promise);
    return promise;
  } catch (error) {
    console.error("can't add object : " + error);
    return [];
  }
}

export async function UpdateCourse(Id, obj) {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const promise = await axios.put(
      authapi + "Courses/UpdateCourse/" + Id,
      obj,
      config
    );
    //console.log(promise);
    return promise;
  } catch (error) {
    console.error("can't update object : " + error);
    return [];
  }
}

export async function DeleteCourse(Id) {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const promise = await axios.delete(
      authapi + "Courses/DeleteCourse/" + Id,
      config
    );
    //console.log(promise);
    return promise;
  } catch (error) {
    console.error("can't delete object : " + error);
    return [];
  }
}
///////////////////////////////////////////////////////////////////////////////////////////
//Roles
export async function GetAllRoles() {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const promise = await axios.get(authapi + "Roles/GetAllRoles", config);
    //console.log(promise);
    return promise;
  } catch (error) {
    console.error("can't get data : " + error);
    return [];
  }
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Categories
export async function GetAllCategories() {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const promise = await axios.get(
      authapi + "Categories/GetAllCategories",
      config
    );
    //console.log(promise);
    return promise;
  } catch (error) {
    console.error("can't get data : " + error);
  }
}

export async function CreateCategory(obj) {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const promise = await axios.post(
      authapi + "Categories/CreateCategory",
      obj,
      config
    );
    //console.log(promise);
    return promise;
  } catch (error) {
    console.error("can't add object : " + error);
    return [];
  }
}

export async function UpdateCategory(Id, obj) {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const promise = await axios.put(
      authapi + "Categories/UpdateCategory/" + Id,
      obj,
      config
    );
    //console.log(promise);
    return promise;
  } catch (error) {
    console.error("can't update object : " + error);
    return [];
  }
}

export async function DeleteCategory(Id) {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const promise = await axios.delete(
      authapi + "Categories/DeleteCategory/" + Id,
      config
    );
    //console.log(promise);
    return promise;
  } catch (error) {
    console.error("can't delete object : " + error);
    return [];
  }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////
//Plans
export async function GetAllPlans() {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const promise = await axios.get(authapi + "Plans/GetAllPlans", config);
    //console.log(promise);
    return promise;
  } catch (error) {
    console.error("can't get data : " + error);
  }
}

export async function CreatePlan(obj) {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const promise = await axios.post(authapi + "Plans/CreatePlan", obj, config);
    //console.log(promise);
    return promise;
  } catch (error) {
    console.error("can't add object : " + error);
    return [];
  }
}

export async function UpdatePlan(Id, obj) {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const promise = await axios.put(
      authapi + "Plans/UpdatePlan/" + Id,
      obj,
      config
    );
    //console.log(promise);
    return promise;
  } catch (error) {
    console.error("can't update object : " + error);
    return [];
  }
}

export async function DeletePlan(Id) {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const promise = await axios.delete(
      authapi + "Plans/DeletePlan/" + Id,
      config
    );
    //console.log(promise);
    return promise;
  } catch (error) {
    console.error("can't delete object : " + error);
    return [];
  }
}

///////////////////////////////////////////////////////////////////////////////////////////////////
//Teachers
export async function GetAllTeachers() {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const promise = await axios.get(
      authapi + "Teachers/GetAllTeachers",
      config
    );
    //console.log(promise);
    return promise;
  } catch (error) {
    console.error("can't get data : " + error);
  }
}

export async function CreateTeacher(obj) {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const promise = await axios.post(
      authapi + "Teachers/CreateTeacher",
      obj,
      config
    );
    //console.log(promise);
    return promise;
  } catch (error) {
    console.error("can't add object : " + error);
    return [];
  }
}

export async function UpdateTeacher(Id, obj) {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const promise = await axios.put(
      authapi + "Teachers/UpdateTeacher/" + Id,
      obj,
      config
    );
    //console.log(promise);
    return promise;
  } catch (error) {
    console.error("can't update object : " + error);
    return [];
  }
}

export async function DeleteTeacher(Id) {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const promise = await axios.delete(
      authapi + "Teachers/DeleteTeacher/" + Id,
      config
    );
    //console.log(promise);
    return promise;
  } catch (error) {
    console.error("can't delete object : " + error);
    return [];
  }
}

///////////////////////////////////////////////////////////////////////////////////////////////////
//Students
export async function GetAllStudents() {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const promise = await axios.get(
      authapi + "Students/GetAllStudents",
      config
    );
    //console.log(promise);
    return promise;
  } catch (error) {
    console.error("can't get data : " + error);
  }
}

export async function CreateStudent(obj) {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const promise = await axios.post(
      authapi + "Students/CreateStudent",
      obj,
      config
    );
    //console.log(promise);
    return promise;
  } catch (error) {
    console.error("can't add object : " + error);
    return [];
  }
}

export async function UpdateStudent(Id, obj) {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const promise = await axios.put(
      authapi + "Students/UpdateStudent/" + Id,
      obj,
      config
    );
    //console.log(promise);
    return promise;
  } catch (error) {
    console.error("can't update object : " + error);
    return [];
  }
}

export async function DeleteStudent(Id) {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const promise = await axios.delete(
      authapi + "Students/DeleteStudent/" + Id,
      config
    );
    //console.log(promise);
    return promise;
  } catch (error) {
    console.error("can't delete object : " + error);
    return [];
  }
}

///////////////////////////////////////////////////////////////////////////////////////////////////
