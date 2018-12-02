using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ProjectManager.Models;
using ProjectManager.BC;
using System.Web.Http;
using ProjectManager.ActionFilters;

namespace ProjectManager.Controllers
{
    public class ProjectController : ApiController
    {
        ProjectBC projObjBC = null;

        public ProjectController()
        {
            projObjBC = new ProjectBC();
        }

        public ProjectController(ProjectBC projectBc)
        {
            projObjBC = projectBc;
        }

        [HttpGet]
        [ProjectManagerLogFilter]
        [ProjectManagerExceptionFilter]
        [Route("api/project")]
        public JSendResponse RetrieveProjects()
        {
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
            return new JSendResponse()
            {
                Data = projObjBC.InsertProjectDetails(project)
            };

        }


        [HttpPost]
        [Route("api/project/update")]
        [ProjectManagerLogFilter]
        [ProjectManagerExceptionFilter]
        public JSendResponse UpdateProjectDetails(Project project)
        {
            return new JSendResponse()
            {
                Data = projObjBC.UpdateProjectDetails(project)
            };
        }

        [HttpPost]
        [Route("api/project/delete")]
        public JSendResponse DeleteProjectDetails(Project project)
        {
            return new JSendResponse()
            {
                Data = projObjBC.DeleteProjectDetails(project)
            };
        }

    }
}