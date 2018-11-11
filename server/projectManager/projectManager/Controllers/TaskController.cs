using projectManager.Models;
using ProjectManager.BC;
using System.Web.Http;

using ProjectManager.ActionFilters;
using System.Collections.Generic;

namespace ProjectManager.Controllers
{
    public class TaskController : ApiController
    {
        TaskBC taskObj = null;

        [HttpGet]
        [Route("api/task")]
        [ProjectManagerLogFilter]
        [ProjectManagerExceptionFilter]
        public JSendResponse RetrieveTask()
        {
            taskObj = new TaskBC();
            List<Task> Tasks = taskObj.RetrieveTask();

            return new JSendResponse()
            {
                Data = Tasks
            };

        }

        //[HttpPost]
        //[Route("api/task/insertTaskDetails")]
        //public JSendResponse InsertTaskDetails(TaskDetails task)
        //{
        //    taskObj = new TaskBC();

        //    return taskObj.InsertTaskDetails(task);

        //}

        //[HttpGet]
        //[Route("api/task/parentTask")]
        //public JSendResponse RetrieveParentTask()
        //{
        //    taskObj = new TaskBC();

        //    return taskObj.RetrieveParentTask();

        //}


    }
}