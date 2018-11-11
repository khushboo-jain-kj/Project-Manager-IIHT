using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ProjectManager.Models;
using ProjectManager.BC;
using System.Web.Http;
using ProjectManager.ActionFilters;
using projectManager.Models;

namespace ProjectManager.Controllers
{
    public class ProjectController : ApiController
    {
        ProjectBC projObjBC = null;

        [HttpGet]
        [ProjectManagerLogFilter]
        [ProjectManagerExceptionFilter]
        [Route("api/project")]
        public JSendResponse RetrieveProjects()
        {
            projObjBC = new ProjectBC();

            List<Project> Projects = projObjBC.RetrieveProjects();

            return new JSendResponse()
            {
                Data = Projects
            };

        }

        [HttpPost]
        [ProjectManagerLogFilter]
        [ProjectManagerExceptionFilter]
        [Route("api/project/add")]
        public JSendResponse InsertProjectDetails(Project project)
        {
            projObjBC = new ProjectBC();

            return new JSendResponse()
            {
                Data = projObjBC.InsertProjectDetails(project)
            };

        }


    }
}