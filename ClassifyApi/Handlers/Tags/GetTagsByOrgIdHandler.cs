using ClassifyApi.Library.DataAccess.Interfaces;
using ClassifyApi.Library.Models;
using ClassifyApi.Queries.Tags;
using MediatR;

namespace ClassifyApi.Handlers.Tags;

public class GetTagsByOrgIdHandler : IRequestHandler<GetTagsByOrgIdQuery, List<Tag>>
{
    private readonly ITagData _tagData;

    public GetTagsByOrgIdHandler(ITagData tagData)
    {
        _tagData = tagData;
    }

    public async Task<List<Tag>> Handle(GetTagsByOrgIdQuery request, CancellationToken cancellationToken)
    {
        List<Tag> tags = await _tagData.GetAllTagsAsync(request.OrgId);

        return tags;
    }
}
