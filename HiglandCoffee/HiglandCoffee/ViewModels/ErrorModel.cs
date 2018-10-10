using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HiglandCoffee.ViewModels
{
    public class ErrorModel
    {
        public List<string> errors { set; get; }

        public ErrorModel()
        {
            errors = new List<string>();
        }

        public void Add(string error)
        {
            errors.Add(error);
        }
    }
}