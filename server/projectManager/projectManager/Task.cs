//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace projectManager
{
    using System;
    using System.Collections.Generic;
    
    public partial class Task
    {
        public string Task_ID { get; set; }
        public string Parent_ID { get; set; }
        public Nullable<System.DateTime> Start_Date { get; set; }
        public Nullable<System.DateTime> End_Date { get; set; }
        public string Project_ID { get; set; }
        public string Task1 { get; set; }
        public string Priority { get; set; }
        public string Status { get; set; }
    
        public virtual Parent_Task Parent_Task { get; set; }
    }
}
