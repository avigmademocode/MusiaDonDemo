using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Musiadon.Models
{
    public class ArtistDTO
    {
        public Int64 ArtistId { get; set; }
        public Int64? GenresId { get; set; }
        public String ArtistName { get; set; }
        public DateTime? ReleaseDate { get; set; }
        public String UploadFilePath { get; set; }
        public String Sys_FileName { get; set; }
        public String Org_FileName { get; set; }
        public Boolean IsActive { get; set; }
        public Int64 CurrUserId { get; set; }
        public int Type { get; set; }
        public string strReleaseDate { get; set; }
    }
    public class DBArtist
    {
        public Int64 ArtistId { get; set; }
        public string ArtistName { get; set; }
        public int Type { get; set; }

    }
}