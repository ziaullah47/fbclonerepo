using fb_clone.DTO;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace fb_clone.Exceptions
{
    public class ApiErrorResponse
    {
        public int StatusCode { get; set; }
        public string Title { get; set; }
        public string Detail { get; set; }
        public List<ValidationError> Errors { get; set; }
        public override string ToString()
        {
            return JsonConvert.SerializeObject(this, new JsonSerializerSettings
            {
                ContractResolver = new CamelCasePropertyNamesContractResolver()
            });
        }
    }
}
