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

const authapi = "https://localhost:44370/V4/api/";

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

//Tenants
export async function GetAllTenants() {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const promise = await axios.get(authapi + "Tenants/GetAllTenants", config);
    //console.log(promise);
    return promise;
  } catch (error) {
    console.error("can't get data : " + error);
  }
}

export async function GetAllActiveTenants() {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const promise = await axios.get(
      authapi + "Tenants/GetAllActiveTenants",
      config
    );
    //console.log(promise);
    return promise.data;
  } catch (error) {
    console.error("can't get data : " + error);
    return [];
  }
}

export async function CreateTenant(obj) {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const promise = await axios.post(
      authapi + "Tenants/CreateTenant",
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

export async function UpdateTenant(Id, obj) {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const promise = await axios.put(
      authapi + "Tenants/UpdateTenant/" + Id,
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

export async function DeleteTenant(Id) {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const promise = await axios.delete(
      authapi + "Tenants/DeleteTenant/" + Id,
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
