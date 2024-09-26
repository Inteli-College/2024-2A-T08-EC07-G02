from fastapi import APIRouter
from services import ChartService

charts_router = APIRouter(prefix="/charts")


@charts_router.get("/checkup_time")
async def get_checkup_time_chart():
    chart_data = ChartService.grafico_checkup_time()
    if "error" in chart_data:
        return {"error": chart_data}
    return {"chart": chart_data}


@charts_router.get("/freq_erros")
async def get_freq_erros_chart():
    chart_data = ChartService.grafico_freq_erros()
    if "error" in chart_data:
        return {"error": chart_data}
    return {"chart": chart_data}
