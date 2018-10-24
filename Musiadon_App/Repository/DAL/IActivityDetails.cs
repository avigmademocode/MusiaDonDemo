using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Musiadon.Models;

namespace Musiadon.Repository.DAL
{
    interface Albums
    {
        List<dynamic> AddAlbums(AlbumsDTO albumsDTO);
            
            
    }

}
