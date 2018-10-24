using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Musiadon.Models
{
    public class SongsQRsDTO
    {
        public Int64 SongQRId { get; set; }
        public Int64 SongId{ get; set; }
        public Int64 QRId { get; set; }
        public DateTime DataUserFirstAccessed { get; set; }
        public String CurrUserId { get; set; }
        public int Type { get; set; }
       
    }
}