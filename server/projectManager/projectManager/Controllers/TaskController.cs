using ProjectManager.Models;
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
        public JSendResponse RetrieveTaskByProjectId(int projectId)
        {
            taskObj = new TaskBC();
            List<Task> Tasks = taskObj.RetrieveTaskByProjectId(projectId);

            return new JSendResponse()
            {
                Data = Tasks
            };

        }

        [HttpGet]
        [Route("api/task/parent")]
        [ProjectManagerLogFilter]
        [ProjectManagerExceptionFilter]
        public JSendResponse RetrieveParentTasks()
        {
            taskObj = new TaskBC();
            List<ParentTask> ParentTasks = taskObj.RetrieveParentTasks();

            return new JSendResponse()
            {
                Data = ParentTasks
            };

        }
        [HttpPost]
        [ProjectManagerLogFilter]
        [ProjectManagerExceptionFilter]
        [Route("api/task/add")]
        public JSendResponse InsertTaskDetails(Task task)
        {
            taskObj = new TaskBC();

            return new JSendResponse()
            {
                Data = taskObj.InsertTaskDetails(task)
            };

        }

        [HttpPost]
        [ProjectManagerLogFilter]
        [ProjectManagerExceptionFilter]
        [Route("api/task/update")]
        public JSendResponse UpdateTaskDetails(Task task)
        {
            taskObj = new TaskBC();

            return new JSendResponse()
            {
                Data = taskObj.UpdateTaskDetails(task)
            };

        }
        [HttpPost]
        [ProjectManagerLogFilter]
        [ProjectManagerExceptionFilter]
        [Route("api/task/delete")]
        public JSendResponse DeleteTaskDetails(Task task)
        {
            taskObj = new TaskBC();
            return new JSendResponse()
            {
                Data = taskObj.DeleteTaskDetails(task)
            };
        }


    }
}