using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Musiadon.Models
{
    public class SongsDTO
    {
        public Int64 SongId { get; set; }
        public String SongName { get; set; }
        public String AlbumName { get; set; }
        public String ArtistName { get; set; }
        public String GenresName { get; set; }
        public String UploadFilePath { get; set; }
        public String FileName { get; set; }
        public String Sys_FileName { get; set; }
        public String Org_FileName { get; set; }
        public int? TotalQRs { get; set; }
        public int? QRsDownloaded { get; set; }
        public String  DistributeQR { get; set; }
        public Int64 AlbumId { get; set; }
        public Int64 GenresId { get; set; }
        public Int64 ArtistId { get; set; }
        public Boolean IsActive { get; set; }
        public Int64 CurrUserId { get; set; }
        public int Type { get; set; }
        public string getsong { get; set; }
    }
  public class song
    {
        public Int64 SongId { get; set; }
        public String SongName { get; set; }
        public String UploadFilePath { get; set; }
        public String FileName { get; set; }
        public String Sys_FileName { get; set; }
        public String Org_FileName { get; set; }
        public int TotalQRs { get; set; }
        public int QRsDownloaded { get; set; }
        public String DistributeQR { get; set; }
        public Int64 AlbumId { get; set; }
        public Int64 CurrUserId { get; set; }
        public int Type { get; set; }
        public string getsong { get; set; }
    }

    public class DBSong
    {
        public Int64 SongId { get; set; }
        public string SongName { get; set; }
        public int AlbumId { get; set; }
        public int ArtistId { get; set; }
        public string ArtistName { get; set; }
        public string AlbumName { get; set; }
        public string GenresName { get; set; }
        public int GenresId { get; set; }
        public int Type { get; set; }
        public Int64 CurrUserId { get; set; }
    }
}