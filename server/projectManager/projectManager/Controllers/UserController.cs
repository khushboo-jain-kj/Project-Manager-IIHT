using ProjectManager.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using ProjectManager.BC;
using ProjectManager.ActionFilters;
using projectManager.Models;

namespace ProjectManager.Controllers
{

    public class UserController : ApiController
    {

        UserBC userObjBC = null;

        [HttpGet]
        [ProjectManagerLogFilter]
        [ProjectManagerExceptionFilter]
        [Route("api/user")]
        public JSendResponse GetUser()
        {
            userObjBC = new UserBC();

            List<User> Users = userObjBC.GetUser();

            return new JSendResponse()
            {
                Data = Users
            };

        }

        [HttpPost]
        [ProjectManagerLogFilter]
        [ProjectManagerExceptionFilter]
        [Route("api/user/add")]
        public JSendResponse InsertUserDetails(User user)
        {
            userObjBC = new UserBC();

            return new JSendResponse()
            {
                Data = userObjBC.InsertUserDetails(user)
            };

        }

        [HttpPost]
        [Route("api/user/update")]
        [ProjectManagerLogFilter]
        [ProjectManagerExceptionFilter]
        public JSendResponse UpdateUserDetails(User user)
        {
            userObjBC = new UserBC();

            return new JSendResponse()
            {
                Data = userObjBC.UpdateUserDetails(user)
            };
        }

        [HttpPost]
        [Route("api/user/delete")]
        public JSendResponse DeleteUserDetails(User user)
        {
            userObjBC = new UserBC();
            return new JSendResponse()
            {
                Data = userObjBC.DeleteUserDetails(user)
            };
        }
    }
}