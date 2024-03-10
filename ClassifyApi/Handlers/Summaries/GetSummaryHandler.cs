using ClassifyApi.Library.DataAccess.Interfaces;
using ClassifyApi.Library.Models;
using ClassifyApi.Queries.Summaries;
using MediatR;

namespace ClassifyApi.Handlers.Summaries;

public class GetSummaryHandler : IRequestHandler<GetSummaryQuery, Summary>
{
    private readonly ISummaryData _summaryData;

    public GetSummaryHandler(ISummaryData summaryData)
    {
        _summaryData = summaryData;
    }

    public async Task<Summary> Handle(GetSummaryQuery request, CancellationToken cancellationToken)
    {
        Summary summary = await _summaryData.GetSummaryAsync(request.OrgId);

        return summary;
    }
}
