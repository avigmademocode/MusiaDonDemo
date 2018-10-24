using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Musiadon.Models
{
    public class UserMasterDTO
    {
        public Int64 UserId { get; set; }
        public String UserName { get; set; }
        public String FirstName { get; set; }
        public String LastName { get; set; }
        public String EmailId { get; set; }
        public Int64 MobileNumber { get; set; }
        public String Password { get; set; }
        public Int64 CurrUserId { get; set; }
        public int Type { get; set; }
    }
}