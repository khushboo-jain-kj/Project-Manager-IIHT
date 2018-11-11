using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ProjectManager.Models;

using MODEL = projectManager.Models;
using DAC = projectManager.DAC;

namespace ProjectManager.BC
{
    public class TaskBC
    {
        public List<MODEL.Task> RetrieveTask()
        {
            using (DAC.ProjectManagerEntities dbContext = new DAC.ProjectManagerEntities())
            {
                return dbContext.Tasks.Select(x => new MODEL.Task()
                {
                   
                }).ToList();
            }

        }

        //public JSendResponse InsertTaskDetails(TaskDetails task)
        //{
        //    ProjectManager.DAC.ProjectManagerEntities tasksObj = new ProjectManager.DAC.ProjectManagerEntities();
        //    if (task.Start_Date == null && task.End_Date == null && task.Task_Name == null)
        //    {
        //        tasksObj.Tasks.Add(new Task()
        //        {
        //            Project_ID = task.Project_ID,
        //            Task_Name = task.Task_Name
        //        });

        //        tasksObj.ParentTasks.Add(new ParentTask()
        //        {
        //            Parent_Task_Name = task.Task_Name
        //        });
        //        // tasksObj.SaveChanges();
        //        //tasksObj.Users.Add(new User()
        //        //{
        //        //    User_ID = task.User_ID
        //        //});
        //        tasksObj.SaveChanges();

        //    }
        //    else
        //    {
        //        tasksObj.Tasks.Add(new Task()
        //        {
        //            Project_ID = task.Project_ID,
        //            Task_Name = task.Task_Name,
        //            End_Date = task.End_Date,
        //            Start_Date=task.Start_Date,
        //            Parent_ID = task.Parent_ID,
        //            Priority = task.Priority

        //        });
        //        int taskId;
        //          taskId =  tasksObj.SaveChanges();
        //        //var taskId = tasksObj.Tasks.Last().Task_ID;
        //        taskId = tasksObj.Tasks.Max().Task_ID;
        //        //tasksObj.Parent_Task.Add(new Parent_Task()
        //        //{
        //        //    Parent_Task_Name = task.Task_Name
        //        //});
        //        var userTaskDetails = (from users in tasksObj.Users
        //                           where users.User_ID.ToString().Contains(task.User_ID.ToString())
        //                           select users).First();
        //        if (userTaskDetails != null)
        //        {
        //            userTaskDetails.Task_ID = task.Task_ID;
        //        }
        //            tasksObj.SaveChanges();

        //    }
        //    return new JSendResponse()
        //    {
        //        Data = 1
        //    };
        //}

        //public JSendResponse RetrieveParentTask()
        //{
        //    ProjectManager.DAC.ProjectManagerEntities tasksObj = new ProjectManager.DAC.ProjectManagerEntities();

        //    return new JSendResponse()
        //    {
        //        Data = tasksObj.ParentTasks.ToList()
        //    };
        //}


    }
}