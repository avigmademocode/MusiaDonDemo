using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Musiadon.Models
{
    public class GenresDTO
    {
        public Int64 GenresId { get; set; }
        public String GenresName { get; set; }
        public Boolean IsActive { get; set; }
        public Int64 CurrUserId { get; set; }
        public int Type { get; set; }
    }
}