﻿using ClassifyApi.Enums;
using ClassifyApi.Library.Models;
using MediatR;

namespace ClassifyApi.Queries.Items;

public class GetItemsByOrgIdQuery : IRequest<List<Item>>
{
    public string OrgId { get; }
    public string? Search { get; set; }
    public ItemSortType? Sort { get; set; }

    public GetItemsByOrgIdQuery(string orgId, string? search, ItemSortType? sort)
    {
        OrgId = orgId;
        Search = search;
        Sort = sort;
    }
}
