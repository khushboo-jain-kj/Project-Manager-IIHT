using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using projectManager;
using projectManager.Models;

namespace projectManager.Controllers
{
    public class UserController : ApiController
    {
        // GET api/<controller>
        [HttpGet]
        [Route("api/user")]
        public JSendResponse GetUser()
        {
            projectManager.Project_ManagerEntities pm = new Project_ManagerEntities();
            return new JSendResponse()
            {
                Data = pm.Users.ToList()
            };
        }
        [HttpPost]
        [Route("api/user/add")]
        public JSendResponse AddUser(User user)
        {
            projectManager.Project_ManagerEntities pm = new Project_ManagerEntities();
            pm.Users.Add(new projectManager.User()
            {
                Last_Name = user.Last_Name,
                First_Name = user.First_Name,
                Employee_ID = user.Employee_ID
            });
            pm.SaveChanges();

            return new JSendResponse()
            {
                Data = 1
            };
        }
    }
}