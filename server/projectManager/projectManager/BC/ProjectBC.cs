using System.Collections.Generic;
using System.Linq;
using MODEL = ProjectManager.Models;
using DAC = projectManager.DAC;

namespace ProjectManager.BC
{
    public class ProjectBC
    {
        public List<MODEL.Project> RetrieveProjects()
        {
            using (DAC.ProjectManagerEntities dbContext = new DAC.ProjectManagerEntities())
            {
                return dbContext.Projects.Select(x => new MODEL.Project()
                {
                    ProjectId = x.Project_ID,
                    ProjectName = x.Project_Name,
                    ProjectEndDate = x.End_Date,
                    ProjectStartDate = x.Start_Date,
                    Priority = x.Priority,
                    User = dbContext.Users.Where(y => y.Project_ID == x.Project_ID).Select(z => new MODEL.User()
                    {
                        UserId = z.User_ID
                    }).FirstOrDefault(),
                    NoOfTasks = dbContext.Tasks.Where(y => y.Project_ID == x.Project_ID).Count(),
                    NoOfCompletedTasks = dbContext.Tasks.Where(y => y.Project_ID == x.Project_ID && y.Status == 1).Count(),
                }).ToList();
            }
        }

        public int InsertProjectDetails(MODEL.Project project)
        {
            using (DAC.ProjectManagerEntities dbContext = new DAC.ProjectManagerEntities())
            {
                DAC.Project proj = new DAC.Project()
                {
                    Project_Name = project.ProjectName,
                    Start_Date = project.ProjectStartDate,
                    End_Date = project.ProjectEndDate,
                    Priority = project.Priority
                };
                dbContext.Projects.Add(proj);
               dbContext.SaveChanges();
                var editDetails = (from editUser in dbContext.Users
                                   where editUser.User_ID.ToString().Contains(project.User.UserId.ToString())
                                   select editUser).First();
                // Modify existing records
                if (editDetails != null)
                {
                    editDetails.Project_ID = proj.Project_ID;
                }
                return dbContext.SaveChanges();
            }
        }

    }
}