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
        public String SongName { get; set; }
        //public Int64 QRId { get; set; }
      //  public string QRCodeText { get; set; }
        public String QRCodeImagePath { get; set; }
        //public Byte[] Image_FileName { get; set; }
        public String ImagePath { get; set; }
        public DateTime DataUserFirstAccessed { get; set; }
        public int CurrUserId { get; set; }
        public int Type { get; set; }
        public Boolean IsActive { get; set; }

        public string strUserFirstAccessed { get; set; }

    }
}